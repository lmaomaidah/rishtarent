import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage.jsx'

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <StatusMessage title="This page doesn't exist" text="The link may be old or mistyped.">
        <p>
          <Link to="/" className="btn btn--secondary">Go to Home</Link>{' '}
          <Link to="/aunties" className="btn">Find an aunty</Link>
        </p>
      </StatusMessage>
    </>
  )
}

export default NotFoundPage
