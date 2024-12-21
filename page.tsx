'use client'

import { useState, useEffect } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import LoginPrompt from './components/LoginPrompt'
import { checkAuth } from './utils/auth'
import { User, Post } from './types'

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  useEffect(() => {
    checkAuth().then(user => {
      if (user) {
        setCurrentUser(user)
      }
    })
  }, [])

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts])
  }

  const handleAuthRequired = () => {
    if (!currentUser) {
      setShowLoginPrompt(true)
      return true
    }
    return false
  }

  return (
    <main className="min-h-screen bg-background">
      {!currentUser && <Login setCurrentUser={setCurrentUser} />}
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="container mx-auto px-4 py-8">
        {currentUser && <PostForm currentUser={currentUser} onPostCreated={handlePostCreated} />}
        <PostList 
          currentUser={currentUser} 
          onAuthRequired={handleAuthRequired}
        />
      </div>
      <LoginPrompt 
        setCurrentUser={setCurrentUser}
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </main>
  )
}

