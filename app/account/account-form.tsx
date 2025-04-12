'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState<string>('')

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.name || '')
      setLoading(false)
    }
  }, [user])

  async function updateDisplayName() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.updateUser({
        data: {
          name: displayName,
        },
      })

      if (error) throw error
      alert('Display name updated successfully!')
    } catch (error) {
      alert('Error updating display name')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email || ''} disabled />
      </div>

      <div>
        <label htmlFor="createdAt">Created At</label>
        <input
          id="createdAt"
          type="text"
          value={user?.created_at ? new Date(user.created_at).toLocaleString() : ''}
          disabled
        />
      </div>

      <div>
        <label htmlFor="displayName">Display Name</label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={updateDisplayName}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update Display Name'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
