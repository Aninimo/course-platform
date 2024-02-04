import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`

export const GET_COURSES = gql`
  query getCourses{
    courses {
      id
      image {
        url
      }
      name
      teacher
      ranting
      hour
      isPremium
      categories {
        id
        name
      }
    }
  }
`

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(where: {id: $id}) {
      id
      name
      image{
        url
      }
      video {
        url
      }
      description
      teacher
      isPremium
      chapter{
        name
        description
        video{
          url
        }
      }
    }
  }
`
