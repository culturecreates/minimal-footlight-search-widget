export const transformData = ({ data, locale, tabSelected }) => {
    const transformedData = data.data.map((eventData) => {
      let place = eventData.location || {};
      // If place is an array then extract first object of type 'Place'
      if (Array.isArray(place)) {
        place =
          eventData.location.filter((place) => place.type === "Place")[0] || {};
      }
  
      // Fallback to English and then French if the locale-specific name is not available
      const title =
        eventData.name?.[locale] ||
        eventData.name?.en ||
        eventData.name?.fr ||
        "";
  
      const addressLocality =
        place.address?.addressLocality?.[locale] ||
        place.address?.addressLocality?.en ||
        place.address?.addressLocality?.fr ||
        "";
  
      const streetAddress =
        place.address?.streetAddress?.[locale] ||
        place.address?.streetAddress?.en ||
        place.address?.streetAddress?.fr ||
        "";
  
      return {
        id: eventData.id,
        title: title,
        ...(tabSelected !== "Organizations"
          ? {
              startDate:
                eventData.subEventDetails.upcomingSubEventCount === 0
                  ? eventData?.startDate || eventData?.startDateTime || ""
                  : eventData.subEventDetails?.nextUpcomingSubEventDateTime ||
                    eventData.subEventDetails?.nextUpcomingSubEventDate ||
                    "",
              endDate: eventData.endDate || eventData.endDateTime || "",
            }
          : {}),
        image: eventData.image?.thumbnail || "",
        place: place.name?.[locale] || place.name?.en || place.name?.fr || "",
        city: addressLocality,
        streetAddress: streetAddress,
      };
    });
    return transformedData;
  };
  
  