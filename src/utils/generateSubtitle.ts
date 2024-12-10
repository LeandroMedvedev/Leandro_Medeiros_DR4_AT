import { IGenerateSubtitleProps } from '../interfaces'

const generateSubtitle: IGenerateSubtitleProps = (item, translate) => {
  return item.observation.slice(0, 20) + '...';
}

export default generateSubtitle;