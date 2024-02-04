import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth, RequireAuthProp} from '@clerk/nextjs/api'

import prismadb from '../../../lib/prismadb'

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
): Promise<void> => {
  try{
     if(req.method === 'POST'){
       const { userId } = req.auth
       const { body } = req
       const { title } = body

       if (!userId) {
         throw new Error('Unauthenticated')
       }

       if (!title) {
         throw new Error('This field is required')
       }

       const note = await prismadb.note.create({
         data:{
           title,
           userId
         }
       })
       return res.status(200).json(note)
     }
  }catch (error) {
    console.log(error)
  }
})
