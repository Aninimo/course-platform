import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api'

import prismadb from '../../lib/prismadb'

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) => {
  try{
    const { userId } = req.auth

    const { body } = req
    const { isCompleted } = body

    if (!userId) {
        throw new Error('Unauthenticated')
    }

    const chapterId = req.query.chapterId as string;
    
    if (!chapterId) {
      throw new Error('Chapter id is required')
    }

    const chapter = await prismadb.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isCompleted
      }
    })
    return res.status(200).json(chapter)
  }catch (error) {
    console.log('[PATCH]', error);
    return res.status(500).json({ message: 'Internal Server Error'     })
  }
})
