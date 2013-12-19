#! /bin/sh

TP=/usr/local/bin/TexturePacker
#TP=~/Programming/TexturePacker/development/main-gui-build/source/app/TexturePacker.app/Contents/MacOS/TexturePacker
echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "[ generate plist ]"
echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
#pack plist & png
SOURCE_DIR='./Resources_src/'
DEST_DIR_HD='./Resources/hd'
DEST_DIR='./Resources/sd'

SCALE_NUM='0.5'
TMP_DIR='/var/tmp/flowershop'

echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "[ pack plist ]Remove the target directory && create a new one"
echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"

[ -d $DEST_DIR ] && rm -rf "$DEST_DIR"
mkdir "$DEST_DIR"

[ -d $DEST_DIR_HD ] && rm -rf "$DEST_DIR_HD"
mkdir "$DEST_DIR_HD"

echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "[ pack plist ] Remove the tmp folder and create the tmp folder"
echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++"

rm -rf "$TMP_DIR"
mkdir  "$TMP_DIR"

echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "[ pack plist ] Begin to packer directory"
echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"

for file in $SOURCE_DIR/*
do 
	if test -f $file
    then
        #echo $file 是文件

        #重命名文件名后缀为小写
        name=`echo "${file%.*}"`
        extension=`echo "${file##*.}"`  
        mv $file $name.`echo $extension|tr "[A-Z]" "[a-z]"`

        #获取文件名
        fn=`basename $file`
        if [ "${file##*.}" = "jpg" ] || [ "${file##*.}" = "png" ];
        then 
        	echo $fn;
        	convert $file -resize 100% $DEST_DIR_HD/$fn
        	convert $file -resize 50% $DEST_DIR/$fn
        elif [ "${file##*.}" = "xml" ] || [ "${file##*.}" = "json" ]; then
            #statements
            echo $fn;
            cp -p $file $DEST_DIR_HD/$fn
            cp -p $file $DEST_DIR/$fn
        elif [ "${file##*.}" = "swf" ]; then
            #statements
            echo $fn;
            cp -p $file $DEST_DIR_HD/$fn
            cp -p $file $DEST_DIR/$fn
        fi
    else
        #echo $file 是目录

        #获取文件名
        fn=`basename $file`

        if [ $fn = "ignore" ];then
            echo "ignore done!";
            continue;
        fi

        #重命名文件名后缀为小写
        for subFile in `ls $file/`
        do
            if test -f $subFile
            then
                file_name=`echo "${subFile%.*}"`
                file_extension=`echo "${subFile##*.}"`            
                mv $file/$subFile $file/$file_name.`echo $file_extension|tr "[A-Z]" "[a-z]"`
            fi
        done

        # create hd assets
		${TP} 	--smart-update --scale 1 $file/*.png \
          		--format cocos2d \
         		--data $TMP_DIR/$fn.plist \
        		--sheet $TMP_DIR/$fn.png

        #create floder		
        #mkdir "$DEST_DIR_HD/$fn"

        #move file
        mv $TMP_DIR/$fn.plist $DEST_DIR_HD/$fn.plist
        mv $TMP_DIR/$fn.png $DEST_DIR_HD/$fn.png

       	#create small assets
		${TP} 	--smart-update --scale 0.5 $file/*.png \
          		--format cocos2d \
         		--data $TMP_DIR/$fn.plist \
        		--sheet $TMP_DIR/$fn.png

        #create floder
		#mkdir "$DEST_DIR/$fn"

		#move file
        mv $TMP_DIR/$fn.plist $DEST_DIR/$fn.plist
        mv $TMP_DIR/$fn.png $DEST_DIR/$fn.png
    fi
done

#echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
#echo "copy cards && heads"
#echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"


echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "[ pack plist ] Packer directory done"
echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
