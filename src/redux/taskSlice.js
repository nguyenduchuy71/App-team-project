import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from '../firebase'
const KEY = 'task'

export const getTasks = createAsyncThunk(`${KEY}/getTasks`, async id => {
  try {
    let data = []
    await db
      .collection('tasks')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.data().project_ID === id) data.push(doc.data())
        })
      })
    return data
  } catch (error) {
    return error
  }
})
export const updateTasks = createAsyncThunk(
  `${KEY}/updateTasks`,
  async task => {
    try {
      await db
        .collection('tasks')
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.data().id === task.data.id) {
              doc.ref.update(task.data)
            }
          })
        })
      return task
    } catch (error) {
      return error
    }
  }
)

export const addTask = createAsyncThunk(`${KEY}/addTask`, async task => {
  try {
    await db.collection('tasks').add(task)
    return task
  } catch (error) {
    return error
  }
})

export const deleteTask = createAsyncThunk(`${KEY}/deleteTask`, async task => {
  try {
    let task_query = db.collection('tasks').where('id', '==', task.id)
    task_query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete()
      })
    })
    return task
  } catch (error) {
    return error
  }
})

const taskSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    tasks: {},
    task: {}
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.isLoading = true
    },
    [getTasks.fulfilled]: (state, action) => {
      const tasks = action.payload
      const todo = { name: 'To do', items: [] }
      const inprogress = { name: 'In Progress', items: [] }
      const done = { name: 'Done', items: [] }
      todo.items = tasks.filter(task => task.typeTask === todo.name)
      inprogress.items = tasks.filter(task => task.typeTask === inprogress.name)
      done.items = tasks.filter(task => task.typeTask === done.name)
      const data = {
        'To do': todo,
        'In Progress': inprogress,
        Done: done
      }
      state.tasks = data
      state.isLoading = false
    },
    [getTasks.rejected]: (state, action) => {
      state.isLoading = false
    },
    [addTask.pending]: (state, action) => {
      state.isLoading = true
    },
    [addTask.fulfilled]: (state, action) => {
      const data = action.payload
      Object.entries(state.tasks).map(([columnId, column], index) => {
        if (data.typeTask === columnId) {
          column.items = [...column.items, data]
        }
      })
      state.isLoading = false
    },
    [addTask.rejected]: (state, action) => {
      state.isLoading = false
    },
    [updateTasks.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateTasks.fulfilled]: (state, action) => {
      const task = action.payload
      Object.entries(state.tasks).map(([columnId, column], index) => {
        if (task.data.typeTask === columnId) {
          column.items = [...column.items, task.data]
        }
        if (task.prevTypeTask === columnId) {
          column.items = column.items.filter(item => item.id !== task.data.id)
        }
      })
      state.isLoading = false
    },
    [updateTasks.rejected]: (state, action) => {
      state.isLoading = false
    },
    [deleteTask.pending]: (state, action) => {
      state.isLoading = true
    },
    [deleteTask.fulfilled]: (state, action) => {
      const task = action.payload
      Object.entries(state.tasks).map(([columnId, column], index) => {
        if (task.typeTask === columnId) {
          column.items = column.items.filter(item => item.id !== task.id)
        }
      })
      state.isLoading = false
    },
    [deleteTask.rejected]: (state, action) => {
      state.isLoading = false
    }
  }
})

const { reducer, actions } = taskSlice
export const { setLoading } = actions
export default reducer
