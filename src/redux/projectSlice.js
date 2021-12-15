import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from '../firebase'
const KEY = 'project'
export const getProjects = createAsyncThunk(`${KEY}/getProjects`, async () => {
  try {
    let data = []
    await db
      .collection('projects')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          data.push(doc.data())
        })
      })
    return data
  } catch (error) {
    return error
  }
})
export const addProject = createAsyncThunk(
  `${KEY}/addProject`,
  async project => {
    try {
      await db.collection('projects').add(project)
      return project
    } catch (error) {
      return error
    }
  }
)
export const deleteProject = createAsyncThunk(
  `${KEY}/deleteProject`,
  async id => {
    try {
      let project_query = db.collection('projects').where('projectId', '==', id)
      project_query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
        })
      })
      return id
    } catch (error) {
      return error
    }
  }
)
export const getProjectById = createAsyncThunk(
  `${KEY}/getProjectById`,
  async id => {
    try {
      return id
    } catch (error) {
      return error
    }
  }
)
const projectSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: true,
    projects: [],
    project: {}
  },
  reducers: {},
  extraReducers: {
    [getProjects.pending]: (state, action) => {
      state.isLoading = true
    },
    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload
      state.isLoading = false
    },
    [getProjects.rejected]: (state, action) => {
      state.isLoading = false
    },
    [addProject.pending]: (state, action) => {
      state.isLoading = true
    },
    [addProject.fulfilled]: (state, action) => {
      const data = action.payload
      state.projects = [...state.projects, data]
      state.isLoading = false
    },
    [addProject.rejected]: (state, action) => {
      state.isLoading = false
    },
    [deleteProject.pending]: (state, action) => {
      state.isLoading = true
    },
    [deleteProject.fulfilled]: (state, action) => {
      const id = action.payload
      const newProject = state.projects
      state.projects = newProject.filter(project => project.projectId !== id)
      state.isLoading = false
    },
    [deleteProject.rejected]: (state, action) => {
      state.isLoading = false
    },
    [getProjectById.pending]: (state, action) => {
      state.isLoading = true
    },
    [getProjectById.fulfilled]: (state, action) => {
      const id = action.payload
      const project = state.projects.find(project => {
        return project.projectId === id
      })
      state.project = project
      state.isLoading = false
    },
    [getProjectById.rejected]: (state, action) => {
      state.isLoading = false
    }
  }
})
const { reducer, actions } = projectSlice
export const { setLoading } = actions
export default reducer
