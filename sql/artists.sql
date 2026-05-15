DROP TABLE IF EXISTS Artists;

CREATE TABLE Artists (
    artistId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(256) NOT NULL,
    bio VARCHAR(2048) NOT NULL,
    startDate DATE NOT NULL,
    imageUrl VARCHAR(512) NOT NULL,
    numAlbums INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE OR REPLACE VIEW ArtistsWithUsers AS 
    SELECT Artists.*, Users.username, Users.fullName, Users.avatarUrl, Users.city, Users.age
    FROM Artists
    JOIN Users ON Artists.userId = Users.userId;

INSERT INTO Artists (userId, name, bio, startDate, imageUrl, numAlbums) VALUES
    (1, 'Foo Fighters', 'Foo Fighters is an American rock band formed in 1994 in Seattle, Washington. The group took its name from foo fighter, a nickname coined by Allied aircraft pilots for UFOs and other aerial phenomena.', '1995-02-03', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/FoosLondonStad220618-124_%2842989552522%29.jpg/1280px-FoosLondonStad220618-124_%2842989552522%29.jpg', 10),
    (1, 'Daft Punk', 'Daft Punk were a French electronic music duo formed in 1993 in Paris by Guy-Manuel de Homem-Christo and Thomas Bangalter. Widely regarded as one of the most influential acts in dance music history, they achieved popularity in the late 1990s as part of the French house movement.', '1992-04-05', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Daftpunklapremiere2010.jpg', 4),
    (2, 'C. Tangana', 'Anton Alvarez Alfaro, better known as C. Tangana, is a Spanish rapper from Madrid, Spain. In 2020, he was named one of the most influential people and most creative artists in Spain by Forbes.', '2011-07-02', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Premios_Goya_2019_-_C_Tangana.jpg/220px-Premios_Goya_2019_-_C_Tangana.jpg', 4),
    (2, 'Powerwolf', 'Powerwolf, often stylized as POWERWOLF, is a German power metal band founded in 2003. The dominant language of their lyrics is English, but they also use Latin, and rarely German. The lyrics of the band are characterized by the treatment of Christianity and ancient Romanian legends.', '2007-05-07', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Powerwolf_-_2019169200102_2019-06-18_Zeltfestival_Rhein-Neckar_-_1274_-_B70I3514.jpg/1280px-Powerwolf_-_2019169200102_2019-06-18_Zeltfestival_Rhein-Neckar_-_1274_-_B70I3514.jpg', 8),
    (3, 'Muse', 'Muse are an English rock band from Teignmouth, Devon, formed in 1994. Muse mix sounds from genres such as electronica, R&B, progressive metal, and art rock, and forms such as classical music, rock opera and many others. They have won numerous awards, including two Grammy Awards, two Brit Awards, five MTV Europe Music Awards and eight NME Awards.', '1999-09-07', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MuseBristol_050619-118_%2848035812973%29.jpg/300px-MuseBristol_050619-118_%2848035812973%29.jpg', 8),
    (3, 'Maneskin', 'Maneskin is an Italian glam rock band formed in Rome in 2016. Their international breakthrough ensued when the foursome won the Eurovision Song Contest 2021 for Italy with the song "Zitti e buoni".', '2016-08-29', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Maneskin_2018.jpg/1920px-Maneskin_2018.jpg', 2);
