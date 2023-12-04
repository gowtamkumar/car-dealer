import { Button } from '@material-tailwind/react'
import { FiShare2 } from 'react-icons/fi'
import { FacebookShareButton } from 'react-share'

const ShareButton = ({ url, title }) => {
  return (
    <FacebookShareButton url={url} quote={title}>
      <code className="flex items-center gap-2 capitalize" color="red">
        <FiShare2 /> Share
      </code>
    </FacebookShareButton>
  )
}

export default ShareButton
