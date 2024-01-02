import { useEffect, useState } from "react"
import './App.css';
import PopupForm from "./components/Popup";
import { deleteUser, getAllUsers } from "./service/api";

export interface TableItem {
  id:number;
  name: string;
  email: string;
  phone_number: string;
  hobbies: string;
}

function App() {
  const [tableItems, setTableItems] = useState<TableItem[]>([])
  const [editableIndex, setEditableIndex] = useState<null | number>(null)
  const [showPopup, setShowpopup] = useState(false)
  const [areAllChecked, setAllChecked] = useState(false)
  let [checkboxItems, setCheckboxItem] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        setTableItems(users)
      })
      .catch((error) => {
        console.error('Error fetching all users:', error);
      });
  }, [])
  // set or unset all checkbox items
  const handleCheckboxItems = () => {
    setAllChecked(!areAllChecked)
    tableItems.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = !areAllChecked
      setCheckboxItem({ ...checkboxItems })
    })
  }

  // Update checked value
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setAllChecked(false)
    setCheckboxItem({ ...checkboxItems, [`checkbox${idx}`]: e.target.checked })
  }

  const deleteRow = async (id:number) => {
    await deleteUser(id)
    window.location.reload()
  }

  const upDateRow = () => {
    if(editableIndex!==null){
      const editables=document.getElementsByTagName('tr')[editableIndex+1].children
      console.log(editables[0].children[1].innerHTML)
      for(let i=1;i<4;i++){
    console.log(editables[i].innerHTML)
      }
    }
    console.log('Row Updated!')
  }

  const sendMail = () => {
    console.log('mail sent!')
  }

  useEffect(() => {
    // Set properties with false value
    tableItems.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = false
      setCheckboxItem({ ...checkboxItems })
    })
  }, [])

  useEffect(() => {
    // Check if all checkbox items are checked and update setAllChecked state
    const checkboxItemsVal = Object.values(checkboxItems)
    const checkedItems = checkboxItemsVal.filter(item => item == true)
    if (checkedItems.length == tableItems.length) setAllChecked(true)
  }, [checkboxItems])

  return (
    <div className="App pt-10">
      {showPopup && <PopupForm onClose={() => setShowpopup(false)} />}
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
                            checked={checkboxItems[`checkbox${idx}`]}
                            onChange={(e) => handleCheckboxChange(e, idx)}
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