using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;

public class ChatHub : Hub
{
    private const string ChatBot = "MyChat Bot";

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
        await Clients
            .Group(userConnection.Room)
            .SendAsync(
                "ReceiveMessage",
                ChatBot,
                $"{userConnection.User} has joined {userConnection.Room}"
            );
    }
}
