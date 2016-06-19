CREATE TABLE IF NOT EXISTS PRODUCT
(
        productID          VARCHAR(128) NOT NULL PRIMARY KEY,
	name		VARCHAR(128) NOT NULL,
        dispName 	VARCHAR(128) NOT NULL,
    	shopID     	VARCHAR(128),
    	category    	VARCHAR(128),
	intro		TEXT,
	detail		TEXT,
	origPrice	FLOAT,
	newPrice	FLOAT,
	discountRate	FLOAT,
	dispBeginDate	DATETIME,
	dispEndDate	DATETIME,
    	insertDate  	DATETIME NOT NULL,
    	updateDate  	DATETIME NOT NULL,
    	delFlg      	TINYINT(2) DEFAULT 0,
	imgList		TEXT,
	count		INT,
	saledCount	INT,
	evulation	FLOAT
) ENGINE=MyISAM DEFAULT CHARACTER SET=UTF8;
