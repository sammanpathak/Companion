def run():
    from users.models import Interest
    from django.db import IntegrityError

    interests = [
        Interest(id=1, name='Movies'),
        Interest(id=2, name='Stoicism'),
        Interest(id=3, name='Tech'),
        Interest(id=4, name='Music'),
        Interest(id=5, name='Travel'),
        Interest(id=6, name='Literature'),
        Interest(id=7, name='Football'),
        Interest(id=8, name='Cricket'),
        Interest(id=9, name='Psychology'),
        Interest(id=10, name='Current Affairs'),
        Interest(id=11, name='Politics'),
        Interest(id=12, name='Cognitive Science'),
    ]

    for interest in interests:
        try:
            interest.save()
        except IntegrityError:
            pass
