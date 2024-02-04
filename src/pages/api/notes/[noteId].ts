import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api';

import prismadb from '../../../lib/prismadb';

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method === 'PATCH') {
      const { userId } = req.auth;
      const { body } = req;
      const { content } = body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const { noteId } = req.query;

      if (!noteId) {
        return res.status(400).json({
          error: 'Content id is required',
        });
      }

      const note = await prismadb.note.update({
        where: {
          id: noteId as string,
        },
        data: {
          content,
        },
      });

      return res.status(200).json(note);
    }
    if(req.method === 'DELETE'){
      const { userId } = req.auth;
      const { noteId } = req.query

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if (!noteId) {
        return res.status(400).json({ error: 'Appointment id is required' })
      }

      const deletedNote = await prismadb.note.delete({
        where: {
          id: noteId as string,
        },
      })

      return res.status(200).json(deletedNote)
    }
  } catch (error) {
    console.error(error)
  }
})
