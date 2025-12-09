
import { Button } from '../../components/ui/button'
import SafeIcon from '../../components/common/SafeIcon'

interface LogoutButtonProps {
  onLogout: () => void
  isLoading?: boolean
}

export default function LogoutButton({ onLogout, isLoading = false }: LogoutButtonProps) {
  return (
    <Button 
      variant="destructive"
      size="lg"
      onClick={onLogout}
      disabled={isLoading}
      className="gap-2"
    >
      <SafeIcon 
        name="LogOut" 
        className="h-5 w-5"
      />
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  )
}
