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
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PhotoId { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(y => y.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName(), cancellationToken: cancellationToken);

                if (user == null) return null;

                var photos = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if (photos == null) return null;

                if (photos.IsMain) return Result<Unit>.Failure("You Cannot Delete Your Main Photo");

                var result = await _photoAccessor.DeletePhoto(photos.Id);
                
                if (result == null) return Result<Unit>.Failure("Problem deleting from cloud");

                user.Photos.Remove(photos);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                
                if (!success) return Result<Unit>.Failure("Problem deleting from DB");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}