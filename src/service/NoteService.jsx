import Axios from "axios";

const Url = 'http://fundoonotes.incubation.bridgelabz.com/api/'
const token = localStorage.getItem("token");

class NoteService {
    saveNote = (note,callback) => {
        return Axios.post(`${Url}notes/addNotes?access_token=${token}`, note
        )
            .then((response) => {
                callback(response);
            })
            .catch((error) => {
                callback(error.response);
            });
    }

    getAllNotes = () => {
        return Axios.get(`${Url}notes/getNotesList?access_token=${token}`)
    }

    updateNote = (data) => {
        return Axios.post(`${Url}notes/updateNotes?access_token=${token}`, data)
    }

    changeNoteColor = (data) => {
        return Axios.post(`${Url}notes/changesColorNotes?access_token=${token}`, data)
    }

    archiveNotes = (data) => {
        return Axios.post(`${Url}notes/archiveNotes?access_token=${token}`, data)
    }

    pinUnpinNotes = (data) => {
        return Axios.post(`${Url}notes/pinUnpinNotes?access_token=${token}`, data)
    }

    deleteNotes = (data) => {
        return Axios.post(`${Url}notes/trashNotes?access_token=${token}`, data)
    }

    deleteNotesForever = (data) => {
        return Axios.post(`${Url}notes/deleteForeverNotes?access_token=${token}`, data)
    }

    restoreTrashNotes = (data) => {
        return Axios.post(`${Url}notes/trashNotes?access_token=${token}`,data)
    }

    noteLabels = (data) => {
        return Axios.post(`${Url}noteLabels?access_token=${token}`, data)
    }

    deleteNoteLabels = (data) => {
        return Axios.delete(`${Url}/noteLabels/${data.id}/deleteNoteLabel?access_token=${token}`, data)
    }

    updateNoteLabels = (data) => {
        return Axios.post(`${Url}/noteLabels/${data.id}/updateNoteLabel?access_token=${token}`, data)
    }


    addLabelToNotes = (data) => {
        return Axios.post(
            `${Url}/notes/${data.NoteId}/addLabelToNotes/${data.lableId}/add?access_token=${token}`
        )
    }

    removeLabelToNotes = (data) => {
        return Axios.post(
            `${Url}/notes/${data.NoteId}/addLabelToNotes/${data.lableId}/remove?access_token=${token}`
        )
    }

    getNotesListByLabels = (data) => {
        return Axios.post(
            `${Url}/notes/getNotesListByLabel/${data}?access_token=${token}`, data)
    }

    getNoteLabelList = () => {
        return Axios.get(`${Url}/noteLabels/getNoteLabelList?access_token=${token}`)
    }
}

export default new NoteService();