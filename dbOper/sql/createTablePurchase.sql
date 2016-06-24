CREATE TABLE IF NOT EXISTS PURCHASE
(
        purchaseID          VARCHAR(128) NOT NULL PRIMARY KEY,
	userID		VARCHAR(128) NOT NULL,
        productID 	VARCHAR(128) NOT NULL,
    	shopID     	VARCHAR(128) NOT NULL,
	count		INT,
	usedCount	INT,
    	insertDate  	DATETIME NOT NULL,
    	updateDate  	DATETIME NOT NULL,
    	delFlg      	TINYINT(1) DEFAULT 0,
    	useLimitDate  	DATETIME,
	paidFlg		TINYINT(1) DEFAULT 0,
	evulation	FLOAT
) ENGINE=MyISAM DEFAULT CHARACTER SET=UTF8;
