'use strict'


const Helpers = use('Helpers');
const Drive = use('Drive');

class FileController {

    async upload({ request }) {


        console.log(request.body)

        let file_name = request.body.fileName;
        const imageFile = request.file('photo');
        await imageFile.move(Helpers.tmpPath('uploads'), {
            name: file_name,
            overwrite: true,
        });

        if (!imageFile.moved()) {
            return imageFile.error();
        }
        return { "file_url": file_name };
    }





    async download({ params, response }) {

        const filePath = `uploads/${params.fileName}`;
        const isExist = await Drive.exists(filePath);

        if (isExist) {
            return response.download(Helpers.tmpPath(filePath));
        }
        return 'File does not exist';
    }
}

module.exports = FileController
