import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    const editNote = async () => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    const handleAddNote = () => {
        if (!title.trim()) {
            setError("Please enter the title");
            return;
        }
        if (!content.trim()) {
            setError("Please enter the content");
            return;
        }
        setError("");

        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }
    }

    return (
        <div className='relative p-4 sm:p-6'>
            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100'
                onClick={onClose}
                aria-label="Close modal"
            >
                <MdClose className='text-xl text-slate-400 cursor-pointer' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type="text"
                    className='text-2xl text-slate-950 outline-none border-b border-gray-300 focus:border-blue-500 transition px-1 py-1'
                    placeholder='Go To Gym At 5'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    className='text-sm sm:text-base text-slate-950 outline-none bg-slate-50 p-3 rounded resize-y min-h-[120px] max-h-[300px] border border-gray-200 focus:border-blue-500 transition'
                    placeholder='Content'
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className='mt-4'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

            <button
                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded mt-6 p-3 transition'
                onClick={handleAddNote}
            >
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    )
}

export default AddEditNotes;
