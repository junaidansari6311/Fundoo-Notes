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

    getAllNotes = (callback) => {
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
}

export default new NoteService();