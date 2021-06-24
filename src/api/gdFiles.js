import axios from "axios";

const gdrive = 'https://www.googleapis.com/upload/drive/v3'
const folderMimeType = 'application/vnd.google-apps.folder'

export default {

    /**
     * @desc creates a folder within google drive. Returns the id of the file in a promise.
     * @param gapi
     * @param folderName
     * @param parents
     * @return Promise
     */
    createFolder(gapi, folderName, parents) {
        const gdFile = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            fields: 'id, name, kind, size, web',
            parents: []
        };
        if (parents) gdFile.parents = parents
        return gapi.client.drive.files.create(gdFile)
            .then(resp => resp.result.id)
    },
    /**
     * @desc adds a file in google drive, can also be folder returns the file id in a promise.
     * @param gapi
     * @param file
     * @param parents
     * @return Promise
     */
    addFile(gapi, file, parents) {
        let ftu = file;
        let f = new Blob([file]);
        let fileId = null
        const gdFile = {
            'content-type': 'application/json',
            mimeType: ftu.type,
            fields: 'id, name, size, webContentLink',
            name: ftu.name,
            parents: []
        }
        let response = null
        if (parents) gdFile.parents = parents
        return gapi.client.drive.files.create(gdFile)
            .then(resp => {
                    response = resp.result
                    return axios.patch(`${gdrive}/files/${resp.result.id}`, f, {
                        params:{
                            fields:'id, name, size, webContentLink'
                        },
                        headers: {
                            'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                            'Content-Type': ftu.type
                        }
                    })
                }
            ).then(resp=>resp.data)
    },
    /**
     * @desc lists folders in google drive
     * @param gapi
     * @param query
     */
    listFiles(gapi, query) {
        return gapi.client.drive.files.list(query)
            .then(res => {
                return Promise.resolve(res.result.files)
            })
    },
    /**
     * @desc deletes a file given its google drive id
     * @param gapi
     * @param id
     */
    deleteFile(gapi, id) {

    },
    /**
     * @desc deletes a folder given its google drive id
     * @param gapi
     * @param id
     */
    deleteFolder(gapi, id) {

    },
    /**
     * @desc gets main Artaplan folder within google drive.
     */
    getMainFolder(gapi) {
        let query = {
            'q': `mimeType = '${folderMimeType}' and trashed = false  and name = 'Artaplan' and 'root' in parents`,
            'fields': 'nextPageToken, files(id, name)',
        }
        return gapi.client.drive.files.list(query)
            .then(res => {
                if (res.result.files.length === 1) {
                    return Promise.resolve(res.result.files[0].id)
                } else if (res.result.files.length > 1) {
                    return Promise.reject(res.result.files)
                } else {
                    return this.createMainFolder(gapi)
                }
            })

    },
    /**
     *
     * @param gapi
     * @return {Promise}
     */
    createMainFolder(gapi) {
        return this.createFolder(gapi, 'Artaplan', ['root'])
    }

}
