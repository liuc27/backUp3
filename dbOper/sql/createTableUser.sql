CREATE TABLE IF NOT EXISTS USER
(
	userID		VARCHAR(128) NOT NULL PRIMARY KEY,
    	account		VARCHAR(128) NOT NULL,
    	password	VARCHAR(1024),
	name		VARCHAR(128),
	nickName	VARCHAR(128),
	phone		VARCHAR(16),
	address		VARCHAR(1024),
	postNum		VARCHAR(16),
	email		VARCHAR(128),
	oauthSource	VARCHAR(128) NOT NULL,
	birthday	DATETIME,
	adminFlg	TINYINT(2) DEFAULT 0,
	certificatedFlg	TINYINT(2) DEFAULT 0,
	gender		TINYINT(3) DEFAULT 2,
	deliverAddress	TEXT,
	currentDeliverAddr	TEXT,
	intro		TEXT,
	image		VARCHAR(1024),
	point		BIGINT DEFAULT 0,
	idCard		VARCHAR(1024),
	insertDate	DATETIME NOT NULL,
	updateDate	DATETIME NOT NULL,
	delFlg		TINYINT(2) DEFAULT 0,
	logo		VARCHAR(1024),
	UNIQUE(account, oauthSource)
) ENGINE=MyISAM DEFAULT CHARACTER SET=UTF8;



