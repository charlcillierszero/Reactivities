using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>()
                .ForMember(
                    toActivity => toActivity.Attendees,
                    config => config.Ignore()
                );
            CreateMap<Activity, ActivityDto>()
                .ForMember(
                    activityDto => activityDto.HostUsername,
                    config => config.MapFrom(activity =>
                        activity.Attendees.SingleOrDefault(a => a.IsHost).AppUser.UserName)
                );
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(
                    profile => profile.Username,
                    config => config.MapFrom(attendee => attendee.AppUser.UserName))
                .ForMember(
                    profile => profile.Displayname,
                    config => config.MapFrom(attendee => attendee.AppUser.DisplayName))
                .ForMember(
                    profile => profile.Bio,
                    config => config.MapFrom(attendee => attendee.AppUser.Bio));
        }
    }
}