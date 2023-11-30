using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;

public class ChatHub : Hub
{
    private const string ChatBot = "MyChat Bot";
    private readonly IDictionary<string, UserConnection> _connections;

    public ChatHub(IDictionary<string, UserConnection> connections)
    {
        _connections = connections;
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
        _connections[Context.ConnectionId] = userConnection;
        await Clients
            .Group(userConnection.Room)
            .SendAsync(
                "ReceiveMessage",
                ChatBot,
                $"{userConnection.User} has joined {userConnection.Room}"
            );
    }

    public async Task SendMessage(string message)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        {
            await Clients
                .Group(userConnection.Room)
                .SendAsync("ReceiveMessage", userConnection.User, message);
        }
    }
}
