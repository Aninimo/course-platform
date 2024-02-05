import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api'

import prismadb from '../../lib/prismadb'
import { IUrl } from '../../interfaces'

interface ChapterProps{
  id: string;
  name: string;
  description: string;
  video: IUrl;
}

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) => {
  try {
    if (req.method === 'POST') {
      const { userId } = req.auth
      const { body } = req

      const { name, image, chapter } = body

      if (!userId) {
        throw new Error('Unauthenticated')
      }

      if (!name && !image && !chapter) {
        throw new Error('Missing required fields');
      }

      const course = await prismadb.course.create({
        data: {
          userId,
          name,
          image,
          chapters: {
            create: chapter.map((chapterItem: ChapterProps) => {
              return {
                video: chapterItem.video.url,
                name: chapterItem.name,
                description: chapterItem.description,
              };
            })
          }
        }
      });

      return res.status(200).json({ course })
    }
  } catch (error) {
    console.log('[POST]', error);
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})
