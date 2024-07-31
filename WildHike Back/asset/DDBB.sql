CREATE DATABASE wildhike;

USE wildhike;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreDeUsuario VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- PARA PODER AÑADIR COSAS A LA TABLA
ALTER TABLE Usuarios
ADD COLUMN rol enum("user", "admin") default "user";

-- INSERTAMOS LOS USUARIOS

insert INTO Usuarios ( nombreDeUsuario, email, password, rol )
VALUES ('Nadinebts','bautistanadin@gmail.com', 'bautista', 'admin'),
('AdrianC','adrianruesca@gmail.com', 'ruesca', 'admin');

insert INTO Usuarios ( nombreDeUsuario, email, password )
VALUES ('Antonia','Antonia@gmail.com', '123456');



CREATE TABLE Rutas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    comarca VARCHAR(100),
    descripcion TEXT,
    tipo VARCHAR(100),
    zona_natural VARCHAR (150),
    estacion VARCHAR(50),
    duracion DECIMAL(5,2),
    dificultad ENUM('Fácil', 'Moderado', 'Difícil'),
    distancia DECIMAL(5,2),
    desnivel INT,
	localizacion_url VARCHAR(250) NOT NULL,
    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE Rutas MODIFY desnivel INT;


CREATE TABLE Galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ruta_id INT,  
    url_imagen VARCHAR(255) NOT NULL,  
    fechaSubida DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ruta_id) REFERENCES Rutas(id) 
);


CREATE TABLE Comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    RutasRealizadas_id INT,
    comentario TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    rating INT,
    FOREIGN KEY (RutasRealizadas_id) REFERENCES RutasRealizadas(id)
);




CREATE TABLE Favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ruta_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (ruta_id) REFERENCES Rutas(id)
);

CREATE TABLE RutasRealizadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ruta_id INT,
    fechaRealizacion DATETIME,
    tiempoRealizacion DECIMAL(5,2),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (ruta_id) REFERENCES Rutas(id)
);


-- AQUI EMPIEZA LA INSERCION DE RUTAS CON GALERIA :
INSERT INTO Rutas (
    nombre, 
    provincia, 
    comarca, 
    descripcion, 
    tipo, 
    zona_natural, 
    estacion, 
    duracion, 
    dificultad, 
    distancia, 
    desnivel, 
    localizacion_url
)
VALUES (
    'Caminito del Rey', 
    'Málaga', 
    'Valle del Guadalhorce', 
    'El Caminito del Rey es una de las rutas de senderismo más impresionantes de Andalucía. Se encuentra en el desfiladero de los Gaitanes y es famosa por su recorrido aéreo con vistas espectaculares.',
    'Senderismo', 
    'Desfiladero de los Gaitanes', 
    'Primavera',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    8.0,  -- Distancia en kilómetros
    300.0,  -- Desnivel en metros
    'https://goo.gl/maps/abcd1234'  -- URL de Google Maps o similar con la ubicación
),
 (
    'Ruta de La Alberquilla', 
    'Málaga', 
    'Axarquía', 
    'La ruta de La Alberquilla es un recorrido fascinante que te lleva por el Parque Natural de las Sierras de Tejeda, Almijara y Alhama. Es conocida por sus paisajes espectaculares y sus bellos arroyos.',
    'Senderismo', 
    'Parque Natural Sierras de Tejeda, Almijara y Alhama', 
    'Otoño',  -- Mejor estación para realizarla
    3.5,  -- Duración en horas
    'Moderado', 
    6.0,  -- Distancia en kilómetros
    250.0,  -- Desnivel en metros
    'https://goo.gl/maps/xyz9876'  -- URL de Google Maps o similar con la ubicación
),
(
    'Ruta del Pico del Cielo', 
    'Málaga', 
    'Axarquía', 
    'La ruta del Pico del Cielo es un desafiante sendero en el Parque Natural de las Sierras de Tejeda, Almijara y Alhama. Esta ruta ofrece vistas panorámicas excepcionales de la costa y las montañas circundantes desde la cumbre.',
    'Senderismo', 
    'Parque Natural Sierras de Tejeda, Almijara y Alhama', 
    'Primavera',  -- Mejor estación para realizarla
    5.0,  -- Duración en horas
    'Difícil', 
    10.0,  -- Distancia en kilómetros
    1200.0,  -- Desnivel en metros
    'https://goo.gl/maps/abcd5678'  -- URL de Google Maps o similar con la ubicación
),
 (
    'Vereda de la Estrella', 
    'Granada', 
    'Sierra Nevada', 
    'La Vereda de la Estrella es una de las rutas más emblemáticas de Sierra Nevada. Este sendero histórico ofrece impresionantes vistas del Mulhacén y la Alcazaba, pasando por antiguos castañares y restos de antiguas minas.',
    'Senderismo', 
    'Parque Nacional de Sierra Nevada', 
    'Otoño',  -- Mejor estación para realizarla
    6.0,  -- Duración en horas
    'Moderado', 
    14.0,  -- Distancia en kilómetros
    500.0,  -- Desnivel en metros
    'https://goo.gl/maps/vereda_estrella'  -- URL de Google Maps o similar con la ubicación
), 
 (
    'Ruta del Trevenque', 
    'Granada', 
    'Sierra Nevada', 
    'El Trevenque, conocido como el "Rey de la Baja Montaña", es una cumbre emblemática en Sierra Nevada. Esta ruta desafiante ofrece unas vistas espectaculares desde la cumbre, incluyendo una panorámica del Veleta y del Mulhacén.',
    'Senderismo', 
    'Parque Nacional de Sierra Nevada', 
    'Primavera',  -- Mejor estación para realizarla
    5.0,  -- Duración en horas
    'Difícil', 
    9.0,  -- Distancia en kilómetros
    800.0,  -- Desnivel en metros
    'https://goo.gl/maps/ruta_trevenque'  -- URL de Google Maps o similar con la ubicación
),
 (
    'Cahorros de Monachil', 
    'Granada', 
    'Vega de Granada', 
    'Los Cahorros de Monachil es una ruta popular cerca de la ciudad de Granada, famosa por sus desfiladeros, puentes colgantes y túneles naturales. Es una ruta ideal para disfrutar de la naturaleza y las formaciones rocosas impresionantes.',
    'Senderismo', 
    'Parque Natural de Sierra Nevada', 
    'Primavera',  -- Mejor estación para realizarla
    3.0,  -- Duración en horas
    'Fácil', 
    8.0,  -- Distancia en kilómetros
    200.0,  -- Desnivel en metros
    'https://goo.gl/maps/cahorros_monachil'  -- URL de Google Maps o similar con la ubicación
),
(
    'Sendero de la Molata y Cala del Plomo', 
    'Almería', 
    'Levante Almeriense', 
    'Esta ruta ofrece una mezcla perfecta de paisaje desértico y marino, llevando a los caminantes por el Parque Natural de Cabo de Gata-Níjar. El sendero conecta varias calas, como la Cala del Plomo, con espectaculares vistas del Mediterráneo.',
    'Senderismo', 
    'Parque Natural Cabo de Gata-Níjar', 
    'Primavera',  -- Mejor estación para realizarla
    2.5,  -- Duración en horas
    'Fácil', 
    6.0,  -- Distancia en kilómetros
    150.0,  -- Desnivel en metros
    'https://goo.gl/maps/sendero_molata_plomo'  -- URL de Google Maps o similar con la ubicación
),
(
    'Ruta del Pico del Chullo', 
    'Almería', 
    'Alpujarra Almeriense', 
    'El Pico del Chullo, con 2.611 metros, es el punto más alto de la provincia de Almería. La ruta hacia su cumbre ofrece vistas impresionantes de la Sierra Nevada y es una excelente opción para quienes buscan una caminata de alta montaña.',
    'Senderismo', 
    'Parque Nacional y Natural de Sierra Nevada', 
    'Verano',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    8.0,  -- Distancia en kilómetros
    700.0,  -- Desnivel en metros
    'https://goo.gl/maps/ruta_pico_chullo'  -- URL de Google Maps o similar con la ubicación
),
(
    'Sendero de los Genoveses', 
    'Almería', 
    'Levante Almeriense', 
    'El Sendero de los Genoveses es una ruta costera en el Parque Natural de Cabo de Gata-Níjar, que lleva a los caminantes a través de una de las playas más emblemáticas de la zona. Es ideal para disfrutar del paisaje costero y las dunas.',
    'Senderismo', 
    'Parque Natural Cabo de Gata-Níjar', 
    'Primavera',  -- Mejor estación para realizarla
    2.0,  -- Duración en horas
    'Fácil', 
    5.0,  -- Distancia en kilómetros
    50.0,  -- Desnivel en metros
    'https://goo.gl/maps/sendero_genoveses'  -- URL de Google Maps o similar con la ubicación
),
(
    'Vía Verde de la Sierra', 
    'Sevilla', 
    'Sierra Sur', 
    'La Vía Verde de la Sierra es un recorrido que sigue el trazado de una antigua vía de tren, ofreciendo un paseo tranquilo a través de paisajes rurales. El recorrido incluye túneles y viaductos, con excelentes vistas del entorno natural.',
    'Senderismo', 
    'Sierra Sur de Sevilla', 
    'Primavera',  -- Mejor estación para realizarla
    5.0,  -- Duración en horas
    'Fácil', 
    36.0,  -- Distancia en kilómetros (aunque se puede realizar por tramos más cortos)
    150.0,  -- Desnivel en metros
    'https://goo.gl/maps/via_verde_sierra'  -- URL de Google Maps o similar con la ubicación
),
(
    'Ruta Circular El Bosque de la Puebla', 
    'Sevilla', 
    'Sierra Norte', 
    'Esta ruta circular atraviesa el frondoso bosque mediterráneo del Parque Natural de la Sierra Norte. Es un recorrido que ofrece tranquilidad y contacto directo con la naturaleza, ideal para observar flora y fauna local.',
    'Senderismo', 
    'Parque Natural Sierra Norte de Sevilla', 
    'Otoño',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    12.0,  -- Distancia en kilómetros
    400.0,  -- Desnivel en metros
    'https://goo.gl/maps/ruta_bosque_puebla'  -- URL de Google Maps o similar con la ubicación
),
(
    'Ruta Ribera del Huéznar', 
    'Sevilla', 
    'Sierra Norte', 
    'La Ruta Ribera del Huéznar sigue el curso del río Huéznar a través de frondosos bosques de galería. Es una de las rutas más hermosas de la Sierra Norte de Sevilla, ideal para disfrutar de la naturaleza y los sonidos del agua.',
    'Senderismo', 
    'Parque Natural Sierra Norte de Sevilla', 
    'Primavera',  -- Mejor estación para realizarla
    3.5,  -- Duración en horas
    'Fácil', 
    10.0,  -- Distancia en kilómetros
    100.0,  -- Desnivel en metros
    'https://goo.gl/maps/ruta_ribera_hueznar'  -- URL de Google Maps o similar con la ubicación
),
(
    'Cahorros del Río Matanegra', 
    'Córdoba', 
    'Sierra de Hornachuelos', 
    'La ruta de los Cahorros del Río Matanegra es una excursión impresionante que ofrece vistas espectaculares de los cañones formados por el río. Es conocida por sus formaciones rocosas y su entorno natural virgen.',
    'Senderismo', 
    'Parque Natural de la Sierra de Hornachuelos', 
    'Primavera',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    12.0,  -- Distancia en kilómetros
    400.0,  -- Desnivel en metros
    'https://goo.gl/maps/cahorros_matanegra'  -- URL de Google Maps o similar con la ubicación
),
 (
    'Sendero de la Subbética', 
    'Córdoba', 
    'Subbética Cordobesa', 
    'El Sendero de la Subbética ofrece un recorrido por el Parque Natural de las Sierras Subbéticas, con vistas a formaciones geológicas únicas y una rica flora y fauna. Es ideal para quienes buscan una experiencia completa en la naturaleza.',
    'Senderismo', 
    'Parque Natural de las Sierras Subbéticas', 
    'Otoño',  -- Mejor estación para realizarla
    5.0,  -- Duración en horas
    'Moderado', 
    14.0,  -- Distancia en kilómetros
    500.0,  -- Desnivel en metros
    'https://goo.gl/maps/sendero_subbetica'  -- URL de Google Maps o similar con la ubicación
),
(
    'Cueva del Peñagordo', 
    'Córdoba', 
    'Sierra de los Pedroches', 
    'La ruta a la Cueva del Peñagordo es una excursión que combina senderismo con la exploración de una cueva natural. Ofrece vistas impresionantes y una inmersión en el paisaje natural de la Sierra de los Pedroches.',
    'Senderismo', 
    'Parque Natural de la Sierra de los Pedroches', 
    'Primavera',  -- Mejor estación para realizarla
    3.5,  -- Duración en horas
    'Fácil', 
    8.0,  -- Distancia en kilómetros
    250.0,  -- Desnivel en metros
    'https://goo.gl/maps/cueva_penagordo'  -- URL de Google Maps o similar con la ubicación
),
(
    'Cueva de los Murciélagos', 
    'Jaén', 
    'Sierra de Cazorla', 
    'La ruta a la Cueva de los Murciélagos en el Parque Natural de las Sierras de Cazorla, Segura y Las Villas es una emocionante excursión que lleva a una cueva con formaciones rocosas únicas y presencia de murciélagos.',
    'Senderismo', 
    'Parque Natural de las Sierras de Cazorla, Segura y Las Villas', 
    'Primavera',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    10.0,  -- Distancia en kilómetros
    300.0,  -- Desnivel en metros
    'https://goo.gl/maps/cueva_murcielagos'  -- URL de Google Maps o similar con la ubicación
),
(
    'Nacimiento del Río Segura', 
    'Jaén', 
    'Sierra de Segura', 
    'Esta ruta lleva a uno de los lugares más emblemáticos del Parque Natural de las Sierras de Cazorla, Segura y Las Villas: el nacimiento del Río Segura. Es un recorrido que destaca por sus paisajes naturales y el entorno fluvial.',
    'Senderismo', 
    'Parque Natural de las Sierras de Cazorla, Segura y Las Villas', 
    'Otoño',  -- Mejor estación para realizarla
    5.0,  -- Duración en horas
    'Moderado', 
    12.0,  -- Distancia en kilómetros
    400.0,  -- Desnivel en metros
    'https://goo.gl/maps/nacimiento_rio_segura'  -- URL de Google Maps o similar con la ubicación
),
(
    'Sierra de Andújar', 
    'Jaén', 
    'Sierra de Andújar', 
    'La ruta por la Sierra de Andújar ofrece una experiencia completa en el Parque Natural de la Sierra de Andújar. Esta excursión destaca por sus vistas panorámicas y la rica biodiversidad, incluyendo el lince ibérico en su hábitat natural.',
    'Senderismo', 
    'Parque Natural de la Sierra de Andújar', 
    'Primavera',  -- Mejor estación para realizarla
    6.0,  -- Duración en horas
    'Difícil', 
    15.0,  -- Distancia en kilómetros
    600.0,  -- Desnivel en metros
    'https://goo.gl/maps/sierra_andujar'  -- URL de Google Maps o similar con la ubicación
),
(
    'Ruta del Río Tinto', 
    'Huelva', 
    'Cuenca Minera', 
    'La Ruta del Río Tinto recorre el lecho del río famoso por sus aguas de color rojizo debido a la actividad minera histórica. El sendero ofrece un recorrido único a través de paisajes de otro mundo y formaciones geológicas.',
    'Senderismo', 
    'Parque Minero de Río Tinto', 
    'Primavera',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    10.0,  -- Distancia en kilómetros
    250.0,  -- Desnivel en metros
    'https://goo.gl/maps/rio_tinto'  -- URL de Google Maps o similar con la ubicación
),
(
    'Acantilados de Marismas', 
    'Huelva', 
    'Marismas del Odiel', 
    'La ruta de los Acantilados de Marismas ofrece vistas espectaculares sobre los acantilados y las marismas del Parque Natural de las Marismas del Odiel. Es ideal para los amantes de la observación de aves y paisajes costeros.',
    'Senderismo', 
    'Parque Natural de las Marismas del Odiel', 
    'Otoño',  -- Mejor estación para realizarla
    3.0,  -- Duración en horas
    'Fácil', 
    6.0,  -- Distancia en kilómetros
    100.0,  -- Desnivel en metros
    'https://goo.gl/maps/acantilados_marismas'  -- URL de Google Maps o similar con la ubicación
),
(
    'Sendero de la Senda de los Castaños', 
    'Huelva', 
    'Sierra de Aracena', 
    'El Sendero de la Senda de los Castaños es un recorrido en la Sierra de Aracena, destacando por su exuberante bosque de castaños y el contacto con la naturaleza en el Parque Natural Sierra de Aracena y Picos de Aroche.',
    'Senderismo', 
    'Parque Natural Sierra de Aracena y Picos de Aroche', 
    'Primavera',  -- Mejor estación para realizarla
    4.0,  -- Duración en horas
    'Moderado', 
    10.0,  -- Distancia en kilómetros
    300.0,  -- Desnivel en metros
    'https://goo.gl/maps/senda_castanos'  -- URL de Google Maps o similar con la ubicación
),
(
    'Sendero de los Pinsapos', 
    'Cádiz', 
    'Sierra de Grazalema', 
    'El Sendero de los Pinsapos en el Parque Natural de la Sierra de Grazalema ofrece una experiencia única en el bosque de pinsapos, una especie de abeto que es típica de esta región. La ruta presenta vistas espectaculares y un entorno natural diverso.',
    'Senderismo', 
    'Parque Natural de la Sierra de Grazalema', 
    'Primavera',  -- Mejor estación para realizarla
    5.0,  -- Duración en horas
    'Moderado', 
    12.0,  -- Distancia en kilómetros
    400.0,  -- Desnivel en metros
    'https://goo.gl/maps/sendero_pinsapos'  -- URL de Google Maps o similar con la ubicación
),
(
    'Caminito del Rey', 
    'Cádiz', 
    'Sierra de Grazalema', 
    'El Caminito del Rey es una de las rutas más famosas de España por su impresionante recorrido por los desfiladeros del Chorro. Aunque está en la provincia de Málaga, su acceso se encuentra en el límite con Cádiz, en la zona del Parque Natural de la Sierra de Grazalema.',
    'Senderismo', 
    'Parque Natural de la Sierra de Grazalema', 
    'Primavera',  -- Mejor estación para realizarla
    3.0,  -- Duración en horas
    'Difícil', 
    7.7,  -- Distancia en kilómetros
    150.0,  -- Desnivel en metros
    'https://goo.gl/maps/caminito_rey'  -- URL de Google Maps o similar con la ubicación
),
 (
    'Sendero de la Cala del Aceite', 
    'Cádiz', 
    'Costa de la Luz', 
    'La Ruta de la Cala del Aceite ofrece un recorrido costero en la Costa de la Luz, con vistas al mar y playas vírgenes. Es ideal para quienes buscan una combinación de senderismo y relajación junto al mar.',
    'Senderismo', 
    'Parque Natural de la Bahía de Cádiz', 
    'Otoño',  -- Mejor estación para realizarla
    2.5,  -- Duración en horas
    'Fácil', 
    6.0,  -- Distancia en kilómetros
    50.0,  -- Desnivel en metros
    'https://goo.gl/maps/cala_aceite'  -- URL de Google Maps o similar con la ubicación
);



INSERT INTO Galeria (ruta_id, url_imagen) VALUES
(25, 'https://images.pexels.com/photos/17943919/pexels-photo-17943919/free-photo-of-paisaje-montanas-viaje-viajar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Caminito del Rey
(25, 'https://images.pexels.com/photos/17941712/pexels-photo-17941712/free-photo-of-paisaje-arboles-montana-rio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Caminito del Rey
(25, 'https://images.pexels.com/photos/17941747/pexels-photo-17941747/free-photo-of-paisaje-gente-caminando-rocas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Caminito del Rey
(26, 'https://s0.wklcdn.com/image_34/1029750/71930272/47249295Master.jpg'),  -- Ruta de La Alberquilla
(26, 'https://s0.wklcdn.com/image_34/1029750/71930277/47249313Master.jpg'),  -- Ruta de La Alberquilla
(26, 'https://s2.wklcdn.com/image_34/1029750/71930279/47249315Master.jpg'),  -- Ruta de La Alberquilla
(27, 'https://s0.wklcdn.com/image_6/208554/6109289/3330693Master.jpg'),  -- Ruta del Pico del Cielo
(27, 'https://s2.wklcdn.com/image_6/208554/6109289/3330683Master.jpg'),  -- Ruta del Pico del Cielo
(27, 'https://s1.wklcdn.com/image_6/208554/6109289/3329587Master.jpg'),  -- Ruta del Pico del Cielo
(28, 'https://s0.wklcdn.com/image_4/146441/12982447/7996185Master.jpg'),  -- Vereda de la Estrella
(28, 'https://s0.wklcdn.com/image_4/146441/12982451/7996239Master.jpg'),  -- Vereda de la Estrella
(28, 'https://s1.wklcdn.com/image_4/146441/12982452/7996255Master.jpg'),  -- Vereda de la Estrella
(29, 'https://s2.wklcdn.com/image_14/422282/3657124/1669688Master.jpg'),  -- Ruta del Trevenque
(29, 'https://s1.wklcdn.com/image_14/422282/3657124/1669690Master.jpg'),  -- Ruta del Trevenque
(29, 'https://s2.wklcdn.com/image_14/422282/3657124/1669685Master.jpg'),  -- Ruta del Trevenque
(30, 'https://s0.wklcdn.com/image_21/633317/13609391/8416113Master.jpg'),  -- Cahorros de Monachil
(30, 'https://s0.wklcdn.com/image_21/633317/13609391/8416125Master.jpg'),  -- Cahorros de Monachil
(30, 'https://s2.wklcdn.com/image_21/633317/13609392/8467898Master.jpg'),  -- Cahorros de Monachil
(31, 'https://s2.wklcdn.com/image_4/134991/20594310/12901559Master.jpg'),  -- Sendero de la Molata y Cala del Plomo
(31, 'https://s0.wklcdn.com/image_4/134991/20594311/12901599Master.jpg'),  -- Sendero de la Molata y Cala del Plomo
(31, 'https://s2.wklcdn.com/image_4/134991/20594312/12901712Master.jpg'),  -- Sendero de la Molata y Cala del Plomo
(32, 'https://s1.wklcdn.com/image_13/397454/6476220/3581902Master.jpg'),  -- Ruta del Pico del Chullo
(32, 'https://s2.wklcdn.com/image_13/397454/6476220/3581894Master.jpg'),  -- Ruta del Pico del Chullo
(32, 'https://s2.wklcdn.com/image_13/397454/6476220/3581897Master.jpg'),  -- Ruta del Pico del Chullo
(33, 'https://s1.wklcdn.com/image_0/10707/6487379/3587899Master.jpg'),  -- Sendero de los Genoveses
(33, 'https://s1.wklcdn.com/image_0/10707/6487379/3587905Master.jpg'),  -- Sendero de los Genoveses
(33, 'https://s1.wklcdn.com/image_0/10707/6487379/3587893Master.jpg'),  -- Sendero de los Genoveses
(34, 'https://s1.wklcdn.com/image_14/436459/4658045/2349382Master.jpg'),  -- Vía Verde de la Sierra
(34, 'https://s1.wklcdn.com/image_14/436459/4658045/2349382Master.jpg'),  -- Vía Verde de la Sierra
(34, 'https://s0.wklcdn.com/image_14/436459/4658045/2349369Master.jpg'),  -- Vía Verde de la Sierra
(35, 'https://s2.wklcdn.com/image_190/5708138/111679366/72006851Master.jpg'),  -- Ruta Circular El Bosque de la Puebla
(35, 'https://example.com/images/ruta_bosque_puebla_1.jpg'),  -- Ruta Circular El Bosque de la Puebla
(35, 'https://example.com/images/ruta_bosque_puebla_2.jpg'),  -- Ruta Circular El Bosque de la Puebla
(36, 'https://s2.wklcdn.com/image_83/2508738/15444541/9612338Master.jpg'),  -- Ruta Ribera del Huéznar
(36, 'https://s1.wklcdn.com/image_83/2508738/15444538/9612337Master.jpg'),  -- Ruta Ribera del Huéznar
(36, 'https://s2.wklcdn.com/image_83/2508738/15444538/9631166Master.jpg'),  -- Ruta Ribera del Huéznar
(37, 'https://s1.wklcdn.com/image_13/397454/14912610/9276061Master.jpg'),  -- Cahorros del Río Matanegra
(37, 'https://s2.wklcdn.com/image_13/397454/14912610/9276053Master.jpg'),  -- Cahorros del Río Matanegra
(37, 'https://s1.wklcdn.com/image_13/397454/14912610/9276046Master.jpg'),  -- Cahorros del Río Matanegra
(38, 'https://images.pexels.com/photos/25109937/pexels-photo-25109937/free-photo-of-madera-arboles-camino-verde.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Sendero de la Subbética
(38, 'https://images.pexels.com/photos/24846908/pexels-photo-24846908/free-photo-of-jardin-arboles-parque-hojas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Sendero de la Subbética
(38, 'https://images.pexels.com/photos/24860820/pexels-photo-24860820/free-photo-of-bosque-arboles-parque-hojas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Sendero de la Subbética
(39, 'https://images.pexels.com/photos/24960011/pexels-photo-24960011/free-photo-of-paisaje-naturaleza-montana-viaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Cueva del Peñagordo
(39, 'https://images.pexels.com/photos/25182750/pexels-photo-25182750/free-photo-of-sarkania-diera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Cueva del Peñagordo
(39, 'https://images.pexels.com/photos/24862330/pexels-photo-24862330/free-photo-of-mar-playa-agua-acantilado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),  -- Cueva del Peñagordo
(40, 'https://s0.wklcdn.com/image_0/749/12167070/7555911Master.jpg'),  -- Cueva de los Murciélagos
(40, 'https://s2.wklcdn.com/image_0/749/12167067/7555868Master.jpg'),  -- Cueva de los Murciélagos
(40, 'https://s0.wklcdn.com/image_5/178146/45573830/29978628Master.jpg'),  -- Cueva de los Murciélagos
(41, 'https://s0.wklcdn.com/image_67/2022367/156589408/98335341Master.jpg'),  -- Nacimiento del Río Segura
(41, 'https://s2.wklcdn.com/image_67/2022367/156589408/98335340Master.jpg'),  -- Nacimiento del Río Segura
(41, 'https://s0.wklcdn.com/image_6/187427/73001710/47904540Master.jpg'),  -- Nacimiento del Río Segura
(42, 'https://s2.wklcdn.com/image_65/1977576/159079087/99756059Master.jpg'),  -- Sierra de Andújar
(42, 'https://s0.wklcdn.com/image_65/1977576/159079087/99756051Master.jpg'),  -- Sierra de Andújar
(42, 'https://s1.wklcdn.com/image_65/1977576/159079087/99756049Master.jpg'),  -- Sierra de Andújar
(43, 'https://s2.wklcdn.com/image_205/6169380/59342730/39601202Master.jpg'),  -- Ruta del Río Tinto
(43, 'https://s0.wklcdn.com/image_61/1839383/16234431/10174572Master.jpg'),  -- Ruta del Río Tinto
(43, 'https://s1.wklcdn.com/image_61/1839383/16234431/10174561Master.jpg'),  -- Ruta del Río Tinto
(44, 'https://s1.wklcdn.com/image_219/6593626/80289050/52072828Master.jpg'),  -- Acantilados de Marismas
(44, 'https://s0.wklcdn.com/image_219/6593626/80289045/52072806Master.jpg'),  -- Acantilados de Marismas
(44, 'https://s1.wklcdn.com/image_219/6593626/80289043/52072798Master.jpg'),  -- Acantilados de Marismas
(45, 'https://s2.wklcdn.com/image_318/9545455/129594425/82632893Master.jpg'),  -- Sendero de la Senda de los Castaños
(45, 'https://s2.wklcdn.com/image_16/485079/96247111/62840666Master.jpg'),  -- Sendero de la Senda de los Castaños
(45, 'https://s2.wklcdn.com/image_16/485079/96247107/63030647Master.jpg'),  -- Sendero de la Senda de los Castaños
(46, 'https://s2.wklcdn.com/image_32/961808/23734261/15080684Master.jpg'),  -- Sendero de los Pinsapos
(46, 'https://s0.wklcdn.com/image_6/185506/70460052/46375488Master.jpg'),  -- Sendero de los Pinsapos
(46, 'https://s0.wklcdn.com/image_6/185506/70460052/46375485Master.jpg'),  -- Sendero de los Pinsapos
(47, 'https://example.com/images/caminito_rey_1.jpg'),  -- Caminito del Rey (Cádiz)
(47, 'https://example.com/images/caminito_rey_2.jpg'),  -- Caminito del Rey (Cádiz)
(47, 'https://example.com/images/caminito_rey_2.jpg'),  -- Caminito del Rey (Cádiz)
(48, 'https://s1.wklcdn.com/image_18/554230/58500555/39081016Master.jpg'),  -- Sendero de la Cala del Aceite
(48, 'https://s2.wklcdn.com/image_18/554230/58500564/39048521Master.jpg'),  -- Sendero de la Cala del Aceite
(48, 'https://s2.wklcdn.com/image_18/554230/58500555/39081014Master.jpg');  -- Sendero de la Cala del Aceite







