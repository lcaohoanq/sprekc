import React from 'react'
import dayjs from 'dayjs'
import { getAvatarUrl } from '../misc/Helpers'

function MovieComments({ comments }) {
  const height = typeof window !== 'undefined' ? window.innerHeight - 280 : 400

  return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <hr className="mb-4 border-gray-300" />

        <div
            className="space-y-6 pr-2 overflow-y-auto overflow-x-hidden"
            style={{ height, maxHeight: height }}
        >
          {comments.map((comment, i) => (
              <div key={comment.username + i} className="flex items-start space-x-4">
                <img
                    src={getAvatarUrl(comment.avatar)}
                    alt={`${comment.username} avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-sm">{comment.username}</div>
                  <div className="text-xs text-gray-500 mb-1">
                    {dayjs(comment.timestamp).format('YYYY-MM-DD HH:mm')}
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-line">{comment.text}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}

export default MovieComments
