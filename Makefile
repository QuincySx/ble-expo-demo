# Build messages.json from protobuf
protobuf:
	make -C ./submodules/firmware/common/protob combine
	./node_modules/.bin/proto2js ./submodules/firmware/common/protob/combined.proto > ./src/data/messages/messages.json
	# messages from local firmware repo
	# make -C ../firmware/common/protob combine
	# ./node_modules/.bin/proto2js ../firmware/common/protob/combined.proto > ./src/data/messages/messages.json
	# node ./scripts/protobuf-types.js
	node scripts/protobuf-types.js typescript