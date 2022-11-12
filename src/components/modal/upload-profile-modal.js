import { Form, Button } from "react-bootstrap";


export const ProfileModal = ({file, uploadFile, setShowModal, uploadAvatar}) => {
    return (
        <div
        tabIndex="-1"
        className=" backdrop-blur-sm backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full"
      >
        <div className="truncate text-center inset-x-1/3 inset-y-0 relative p-4 max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-gray"
              onClick={() => setShowModal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                Upload a photo
              </h3>
              <Form>
                <Form.Group className="mb-3">
                  <img src={file ? URL.createObjectURL(file) : "/images/upload-photo.jpeg"}
                    alt="upload"
                  />
                </Form.Group>  
                <Form.Group className="mb-3 w-2/4 mr-12">
                  <input type="file" accept="image/*" onChange={uploadFile} />
                </Form.Group>
                {file && (<Button className="mt-3 text-white bg-blue-medium rounded w-2/5" variant="primary" type="button" onClick={uploadAvatar}>Update </Button>)}
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfileModal;