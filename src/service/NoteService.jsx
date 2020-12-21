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
}

export default new NoteService();