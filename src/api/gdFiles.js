import axios from "axios";

const gdrive = 'https://www.googleapis.com/upload/drive/v3'
const folderMimeType = 'application/vnd.google-apps.folder'
const fileFields = 'id, name, webContentLink, size, createdTime, webViewLink, description'

export default {

    /**
     * @desc creates a folder within google drive. Returns the id of the file in a promise. extras are other fields
     * that can be added.
     * @param gapi
     * @param folderName
     * @param parents
     * @param extras
     * @return Promise
     */
    createFolder(gapi, folderName, parents, extras) {
        let _extras = (extras === undefined || extras === null) ? {} : extras
        const gdFile = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            fields: 'id, name, kind, size',
            parents: [],
            ..._extras
        };
        if (parents) gdFile.parents = parents
        return gapi.client.drive.files.create(gdFile)
            .then(resp => Promise.resolve(resp.result.id))
    },

    /**
     *
     * @param gapi
     * @param id
     * @param description
     * @param name
     */
    updateFile(gapi, id, {description, name}) {

        return axios.patch(`${gdrive}/files/${id}`,
            {description: description, name: name},
            {
                params: {
                    fields: fileFields,
                    uploadType:'multipart'
                },
                headers: {
                    'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                    'Content-Type': ftu.type
                }
            }).then(resp=>resp.data)
    },
    /**
     * @desc adds a file in google drive, can also be folder returns the file id in a promise.
     * extras inlclude every other additional option that the google drive's File documentation has
     * @param gapi
     * @param file
     * @param parents
     * @param extras
     * @return Promise
     */
    addFile(gapi, file, parents, extras) {
        let ftu = file;
        let f = new Blob([file]);
        let fileId = null
        let _extras = (extras === undefined || extras === null) ? {} : extras

        const gdFile = {
            'content-type': 'application/json',
            mimeType: ftu.type,
            fields: fileFields,
            parents: [],
            ..._extras
        }
        let response = null
        if (parents) gdFile.parents = parents
        return gapi.client.drive.files.create(gdFile)
            .then(resp => {
                    response = resp.result
                    return axios.patch(`${gdrive}/files/${resp.result.id}`, f, {
                        params: {
                            fields: fileFields
                        },
                        headers: {
                            'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
                            'Content-Type': ftu.type
                        }
                    })
                }
            ).then(resp => resp.data)
    },
    /**
     * @desc lists folders in google drive
     * @param gapi
     * @param query
     */
    listFiles(gapi, query) {
        let fields = {
            'fields': `nextPageToken, files(${fileFields})`,
        }
        return gapi.client.drive.files.list({...query, ...fields})
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
        return gapi.client.drive.files.delete({
            fileId: id
        }).then(resp => Promise.resolve(true))
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
