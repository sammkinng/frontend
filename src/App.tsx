import { useEffect, useState } from "react"
import './App.css';
import PopupForm from "./components/Popup";
import { deleteUser, getAllUsers, sendEmail, updateUser } from "./service/api";
import Loader from "./components/Loader";

export interface TableItem {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  hobbies: string;
}

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [editableIndex, setEditableIndex] = useState<null | number>(null)
  const [showPopup, setShowpopup] = useState(false)
  const [areAllChecked, setAllChecked] = useState(false)
  const [checkboxItems, setCheckboxItem] = useState<Set<number>>(new Set());

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        setTableItems(users)
        setShowLoader(false)
      })
      .catch((error) => {
        console.error('Error fetching all users:', error);
      });
  }, [])

  // set or unset all checkbox items
  const handleCheckboxItems = () => {
    if (areAllChecked) {
      setCheckboxItem(new Set())
    }
    else {
      const set: Set<number> = new Set()
      tableItems.forEach((item, idx) => {
        set.add(item.id)
      })
      setCheckboxItem(set)
    }
    setAllChecked(!areAllChecked)
  }

  // Update checked value
  const handleCheckboxChange = (id: number) => {
    console.log(id, checkboxItems.has(id))
    if (checkboxItems.has(id)) {
      setAllChecked(false)
      checkboxItems.delete(id)
    }
    else {
      checkboxItems.add(id)
    }

    setCheckboxItem(new Set(checkboxItems))
  }

  const deleteRow = async (id: number) => {
    setShowLoader(true)
    await deleteUser(id)
    window.location.reload()
  }

  const upDateRow = async () => {
    if (editableIndex !== null) {
      setShowLoader(true)
      const editables = document.getElementsByTagName('tr')[editableIndex + 1].children

      await updateUser(tableItems[editableIndex].id, {
        name: editables[0].children[1].innerHTML,
        phone_number: editables[2].innerHTML,
        email: editables[1].innerHTML,
        hobbies: editables[3].innerHTML
      })
      window.location.reload()
      console.log('Row Updated!')
    }

  }

  const sendMail = async () => {
    setShowLoader(true)
    const res = await sendEmail({
      email: "test@testmail.com",
      ids: Array.from(checkboxItems)
    })
    setShowLoader(false)
    window.open(res)
  }

  return (
    <div className="App pt-10">
      {showLoader && <Loader />}
      {showPopup && <PopupForm onClose={() => setShowpopup(false)} showLoader={() => setShowLoader(true)} />}
      <header>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">

              <p className="text-gray-100 ">
                Redpositive Assignment      </p>
            </div>
            <div className="mt-3 md:mt-0 flex gap-4">
              <button onClick={() => setShowpopup(true)}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Add Row
              </button>
              <button onClick={() => sendMail()}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700 md:text-sm"
              >
                Send Mail
              </button>
            </div>
          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-gray-100 font-medium border-b">
                <tr>
                  <th className="py-3 px-6 flex items-center gap-x-4">
                    <div>
                      <input type="checkbox" id="checkbox-all-items" className="checkbox-item peer hidden"
                        checked={areAllChecked}
                        onChange={handleCheckboxItems}
                      />
                      <label
                        htmlFor="checkbox-all-items"
                        className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                      >
                      </label>
                    </div>
                    Name
                  </th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Telephone</th>
                  <th className="py-3 px-6">Hobbies</th>
                  <th className="py-3 px-6"></th>

                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {
                  tableItems.map((item, idx) => (
                    <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                        <div>
                          <input type="checkbox" id={`checkbox-${idx}`} name={`checkbox-${idx}`} className="checkbox-item peer hidden"
                            checked={checkboxItems.has(item.id)}
                            onChange={(e) => handleCheckboxChange(item.id)}
                          />
                          <label
                            htmlFor={`checkbox-${idx}`}
                            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                          >
                          </label>
                        </div>
                        <div contentEditable={editableIndex === idx} className={`${editableIndex === idx ? "text-indigo-600" : ""}`}>
                          {item.name}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${editableIndex === idx ? "text-indigo-600" : ""}`} contentEditable={editableIndex === idx}>{item.email}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${editableIndex === idx ? "text-indigo-600" : ""}`} contentEditable={editableIndex === idx}>{item.phone_number}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${editableIndex === idx ? "text-indigo-600" : ""}`} contentEditable={editableIndex === idx}>{item.hobbies}</td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <button onClick={() => {
                          if (editableIndex === idx) {
                            upDateRow()
                          }
                          else {
                            setEditableIndex(idx)
                          }
                        }} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                          {editableIndex === idx ? 'Save' : 'Edit'}
                        </button>
                        <button onClick={() => {
                          if (window.confirm("Are you sure to delete this row?")) {
                            deleteRow(item.id)
                          }
                        }} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;