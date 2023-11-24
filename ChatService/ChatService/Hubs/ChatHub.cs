using System;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    private readonly string _chatBot;

    public ChatHub()
    {
        _chatBot = "MyChat Bot";
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
        await Clients
            .Group(userConnection.Room)
            .SendAsync(
                "ReceiveMessage",
                _chatBot,
                $"{userConnection.User} has joined {userConnection.Room}"
            );
    }
}
