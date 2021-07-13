import {Container} from '@/components/container'
import {SignUp} from '@/components/signup'

export const Index = () => {
  return (
    <Container>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
        <SignUp/>
      </div>
    </Container>
  )
}

export default Index
