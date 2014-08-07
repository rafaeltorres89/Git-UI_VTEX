
// POLISHOP JavaScript
// old.highlight.js : 1.00

	var highlightTimer;

	$( function ()
	{
		function appendNavBullets (aditional)
		{
			$highlight.find('.results > ul').each( function ( index )
			{
				$highlight.find('.nav ol.menu').append('<li><a href="#" class="step">' + (index + aditional) + '</a></li>');
			});
		}

		function serverTime ()
		{
			var time;

			$.ajax(
			{
				url: 'http://www.dev.polishop.com.br/no-cache/HoraAtualServidor.aspx',
				async: false,
				dataType: "text",
				success: function (textime)
				{
					var split = (textime.indexOf(':') + 6),
							textimedit = textime.substring(0,split).replace(/fev/i, 'feb').replace(/mai/i, 'may').replace(/ago/i, 'aug').replace(/set/i, 'sep').replace(/out/i, 'oct').replace(/dez/i, 'dec');
					time = new Date(textimedit);
				},
				error: function (http, message, exc)
				{
					time = new Date();
				}
			});

			return time;
		}

		var tickNow = serverTime(),
				finalTick = new Date($('#clock').text());

		$('#clock').countdown({ serverSync: serverTime, until: finalTick, format: 'H', layout: '<span class="countdown"><span class="number">{hnn}</span><span class="text">Horas</span></span>' });

		$('#clock').show();

		if ( $("body").hasClass("home") || $("body").hasClass("departamento") )
		{
			var currentHighlight = 0,
					$highlight = $('#highlight'),
					numHighlights = $highlight.find('.results > ul').length - 1,
					timerInterval = 8000,
					time = null;

			if ( $highlight.exists() )
			{
				if ( $highlight.find('.results p.list-price').exists() && $.browser.msie )
				{
					$highlight.find('.results p.list-price').css({ 'opacity' : '.8' });
				}

				$highlight.find('h2:first').remove();
				$highlight.append('<div class="nav"><ol class="menu"></ol></div>');

				if ( !$('#promo').children().exists() )
				{
					appendNavBullets(0);
				}
					else
				{
					appendNavBullets(1);
					$highlight.find('.results').prepend('<ul><li></li></ul>');
					$('#promo').appendTo('#highlight .results ul:first > li');
					$highlight.find('.nav ol.menu').append('<li><a href="#" class="step">0</a></li>');
				}

				$highlight.find('.nav ol.menu li:first a').addClass('active');

				serverTime();

				var clockLayout = '<span class="countdown_row countdown_show3"><span class="countdown_section"><span class="countdown_amount">{hnn}</span><br>Horas</span><span class="countdown_section"><span class="countdown_amount">{mnn}</span><br>Minutos</span><span class="countdown_section"><span class="countdown_amount">{snn}</span><br/>Segundos</div></span>';

				if ( numHighlights >= 1 )
				{
					highlightTimer = $.timer( timerInterval, function ( highlightTimer )
					{
						if (currentHighlight < numHighlights)
						{
							currentHighlight++;
						}
							else
						{
							currentHighlight = 0;
						}

						$highlight.find('.nav ol.menu li:eq(' + currentHighlight + ') a.step').trigger('click');
					});
				}

				if ( $highlight.find('.nav ol.menu a').exists() )
				{
					$highlight.find('.nav ol.menu li').each( function ( index )
					{
						$(this).find('a.step').click( function ( event )
						{
							event.preventDefault();
							$highlight.find('.results > ul').hide();
							$highlight.find('.results > ul:eq(' + index + ')').css({ 'opacity' : '0' }).show().stop().animate({ 'opacity' : '1' }, 500);
							$highlight.find('.nav ol.menu li a').removeClass('active');
							$(this).addClass('active');
							currentHighlight = index;

							if ( numHighlights >= 1)
							{
								highlightTimer.stop();
								highlightTimer.reset(timerInterval);
							}

							if ( $highlight.find('.results > ul:eq(' + index + ') div.extras div.product-field').exists() )
							{
								var ticksUntil;

								switch ( $highlight.find('.results > ul:eq(' + index + ') div.extras div.product-field ul li').attr('class') )
								{
									case 'clock-24h' :

										if ( !$highlight.find('.results > ul:eq(' + index + ') div#clock').exists() )
										{
											ticksUntil = new Date(time.getFullYear(), time.getMonth(), (time.getDate() + 1));
											$highlight.find('.results > ul:eq(' + index + ') a.link').addClass('clock');
											$highlight.find('.results > ul:eq(' + index + ') a.link').append('<div id="clock" />');
											$highlight.find('.results > ul:eq(' + index + ') a.link div#clock').countdown({ serverSync: serverTime, until: ticksUntil, layout: clockLayout });
										}

										if ( $highlight.find('.results > ul:eq(' + index + ') p.list-price').exists() )
										{
											$highlight.find('.results > ul:eq(' + index + ') a.link').addClass('offer');
										}

										break;

									case 'clock-48h' :

										if ( !$highlight.find('.results > ul:eq(' + index + ') div#clock').exists() )
										{
											var today = new Date();

											if ( today.getDay() === 6 ) { ticksUntil = new Date(time.getFullYear(), time.getMonth(), (time.getDate() + 2)); }
											if ( today.getDay() === 0 ) { ticksUntil = new Date(time.getFullYear(), time.getMonth(), (time.getDate() + 1)); }
											$highlight.find('.results > ul:eq(' + index + ') a.link').addClass('clock');
											$highlight.find('.results > ul:eq(' + index + ') a.link').append('<div id="clock" />');
											$highlight.find('.results > ul:eq(' + index + ') a.link div#clock').countdown({ serverSync: serverTime, until: ticksUntil, layout: clockLayout });
										}

										if ( $highlight.find('.results > ul:eq(' + index + ') p.list-price').exists() )
										{
											$highlight.find('.results > ul:eq(' + index + ') a.link').addClass('offer');
										}

										break;
									}
								}
							});
						});
					}
					$highlight.find('.nav ol.menu li:first a.step').trigger('click');
				}
			}
		});

	// Funtion to check if element exists

	$.fn.exists = function() { return $(this).length > 0; };

	// Funtion to check if element is visible

	$.fn.visible = function() { return $(this).is(':visible'); };
