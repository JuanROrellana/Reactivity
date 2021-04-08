using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PhotoId { get; set; }
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
                var user = await _context.Users.Include(y => y.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(), cancellationToken: cancellationToken);
                
                if (user == null) return null;

                var photos = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
                
                if (photos == null) return null;

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                
                if (currentMain == null) currentMain.IsMain = false;

                photos.IsMain = true;
                
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                
                if (!success) return Result<Unit>.Failure("Problem Setting up Main Photo");
                
                return Result<Unit>.Success(Unit.Value);
                
            }
        }
    }
}