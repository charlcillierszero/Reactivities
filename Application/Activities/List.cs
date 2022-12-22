using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
	public class List
	{
		public class Query : IRequest<Result<List<Activity>>> { }

		public class Handler : IRequestHandler<Query, Result<List<Activity>>>
		{
			private readonly DataContext _dataContext;

			public Handler(DataContext dataContext)
			{
				_dataContext = dataContext;
			}

			public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var activities = await _dataContext.Activities.ToListAsync();
				return Result<List<Activity>>.Success(activities);
			}
		}
	}
}