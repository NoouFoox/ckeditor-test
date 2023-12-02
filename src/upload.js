import axios from "axios";
class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          let data = new FormData();
          data.append("file", file, file.name);
          axios({
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=----WebKitFormBoundary3dPESW2ZFHcooRFO",
            },
            url: "/upload/file",
            baseURL: "http://192.168.3.244:80/api",
            data,
            method: "post",
          })
            .then((res) => {
              return resolve({
                default: res.data.data.url,
              });
            })
            .catch((e) => {
              return reject(e);
            });
        })
    );
  }
}

function customUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}

export { UploadAdapter, customUploadAdapterPlugin };
