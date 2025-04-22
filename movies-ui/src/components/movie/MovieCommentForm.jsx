import React from 'react'

function MovieCommentForm({ authenticated, commentText, handleAddComment, handleChange }) {
  return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add a comment</h2>
        <hr className="border-gray-300" />

        <div className={`relative ${!authenticated ? 'opacity-50 pointer-events-none' : ''}`}>
          <form onSubmit={handleAddComment} className="flex gap-4">
            <input
                id="commentText"
                value={commentText}
                onChange={handleChange}
                placeholder="Tell us more about ..."
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={commentText.trim() === ''}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Submit
            </button>
          </form>

          {!authenticated && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded">
                <h3 className="text-white text-center text-sm font-medium">
                  To add a comment you must be logged in
                </h3>
              </div>
          )}
        </div>
      </div>
  )
}

export default MovieCommentForm
