import { render } from '@testing-library/react'

import { CourseCard } from '../../components/courseCard'
import { CourseProps } from '../../interfaces';

test('renders CourseCard component', () => {
  const sampleCourse: CourseProps = {
    id: '1',
    name: 'Sample Course',
    teacher: 'John Doe',
    image: { url: 'sample-image-url' },
    hour: '2h',
    ranting: '4.5',
    userId: '123',
    description: 'Sample description',
    isFree: false,
    categories: [{ id: 'category1', name: 'CategoryName', courses: [] }], 
    chapter: [{ id: 'chapter1', name: 'ChapterName', description: 'ChapterDescription', video: { url: 'chapter-video-url' }, isCompleted: false }], 
    video: { url: 'course-video-url' } 
  };

  render(<CourseCard course={sampleCourse} />);
});
