import Category from './Category';
import Ingredient from './Ingredient';

interface Post {
  title: string,
  description: string,
  images?: {
    contentType: string,
    data: Buffer,
    thumbnail: Buffer,
    size: number,
  }[],
  prep_time: string,
  cook_time: string,
  serves: number,
  text: string,
  published: boolean,
  category: Category[],
  ingredient: Ingredient[],
  _id: string,
}

export default Post;
