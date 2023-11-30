type ConnectedUsersProps = {
    users: string[]
}

const ConnectedUsers = ({ users }: ConnectedUsersProps) => (
    <div className='user-list'>
        <h4>Connected Users</h4>
        {users.map((user) => (
            <h6 key={user}>{user}</h6>
        ))}
    </div>
)

export default ConnectedUsers
