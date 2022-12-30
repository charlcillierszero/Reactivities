using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(activity => activity.Attendees)
                    .ThenInclude(attendee => attendee.AppUser)
                    .SingleOrDefaultAsync(activity => activity.Id == request.Id);

                if (activity is null) return null;

                var user = await _context.Users.SingleOrDefaultAsync(user =>
                    user.UserName == _userAccessor.GetUsername());

                if (user is null) return null;

                var hostUser = activity.Attendees.SingleOrDefault(attendee => attendee.IsHost);
                var attendance = activity.Attendees.SingleOrDefault(attendee => attendee.AppUser.UserName == user.UserName);

                if (attendance is not null)
                    if (attendance.AppUserId == hostUser.AppUserId)
                        activity.IsCancelled = !activity.IsCancelled;
                    else
                        activity.Attendees.Remove(attendance);
                else
                    activity.Attendees.Add(new ActivityAttendee { Activity = activity, AppUser = user, IsHost = false });

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}