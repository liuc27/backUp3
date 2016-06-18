CREATE TABLE IF NOT EXISTS SHOP
(
        shopID          VARCHAR(128) NOT NULL PRIMARY KEY,
	owner		VARCHAR(128) NOT NULL,
	name		VARCHAR(128) NOT NULL,
        dispName 	VARCHAR(128) NOT NULL,
    	address     	VARCHAR(128),
	latitude	DECIMAL(10,6),
	longitude	DECIMAL(10,6),
    	category    	VARCHAR(128),
    	administrator	VARCHAR(128),
    	insertDate  	DATETIME NOT NULL,
    	updateDate  	DATETIME NOT NULL,
    	delFlg      	TINYINT(2) DEFAULT 0,
    	intro       	TEXT,
    	logo        	VARCHAR(1024),
	UNIQUE(dispName)
) ENGINE=MyISAM DEFAULT CHARACTER SET=UTF8;
