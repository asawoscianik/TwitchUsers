$(document).ready(function () {

	var online_profiles = $('.online');
	var offline_profiles = $('.offline');
	var streamers_arr = [];


	$('#go').on('click', function(){

	var streamer_name = $('#name').val();

		$.ajax({

	    	type: 'GET',
		    url: `https://wind-bow.glitch.me/twitch-api/streams/${streamer_name}`,

		    success: function (data) {

		    	console.log("success connect");

				if(data.stream === null){

					$.ajax({

				    	type: 'GET',
					    url: `https://wind-bow.glitch.me/twitch-api/channels/${streamer_name}`,

						success: function(data_two){

							if(data_two.stream !=null || data_two.error != "Not Found"){

								offline_profiles.append(
								`<a target="_blank" href="https://www.twitch.tv/${streamer_name}">` + '<li>'
								+ '<img src="' + data_two.logo + '"/>' + '</br>'
								+ '<div class="content_streamer">' + '<p class="red">' + data_two.display_name + '</p>' + '</br>'
								+ data_two.game + '</br>'
								+ '</div>'
								+ '</li>'
								+ '</a>'
								);
								streamers_arr.push(streamer_name);
								// offlines.push(streamer_name);
								// offline_profiles.html(offlines + " ");
							}

							else{
								alert('streamer not found');
							}

						},

						error: function(){
							alert("This streamer does not exist");
						}
					});
				}

				else{

					online_profiles.append(
						`<a target="_blank" href="https://www.twitch.tv/${streamer_name}">` + '<li>'
						+ '<img src="' + data.stream.channel.logo + '"/>'
						+ '<div class="content_streamer">' + '<p class="green">'+ data.stream.channel.display_name + '</p>' + '</br>'
						+ data.stream.game + '</br>'
						+ '</div>'
						+ '</li>'
						+ '</a>'
					);
						streamers_arr.push(streamer_name);
					// onlines.push(streamer_name);
					// online_profiles.html(onlines + " ");
				}

		    },

			error: function(){
				alert("This streamer does not exist");
			}

		});

	});

	$('#show_all').on('click', function(){

		online_profiles.show();
		offline_profiles.show();
		console.log(streamers_arr);

	});

	$('#show_online').on('click', function(){

		online_profiles.show();
		offline_profiles.hide();

	});

	$('#show_offline').on('click', function(){

		online_profiles.hide();
		offline_profiles.show();

	});


});
