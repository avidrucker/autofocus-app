import React from 'react';
import HomeOrg from '../components/HomeOrg';
import AddNewOrg from '../components/AddNewOrg';
import ReviewOrg from '../components/ReviewOrg';
import FocusOrg from '../components/FocusOrg';

export const prototypeMap = (key: string, props: any) => {
	if(key === "welcome") // start on welcome screen
		return <HomeOrg {...props} designId="001" h2="Welcome Home" step="A" />;
	if(key === "add-new") // add new is all that can be done at first
	 return <AddNewOrg {...props} designId="002" h2="Add Todo" step="B" />;
	if(key === "home") // after adding the first new item, we return home, now with our first item
		return <HomeOrg {...props} designId="004" h2="Home 1 Unmarked" step="C" />;
	if(key === "add-new-2") // let's add a 2nd item
		return <AddNewOrg {...props} designId="002" h2="Add Todo" step="D" />;
	if(key === "home-2") // we now see 2 items on the home screen
		return <HomeOrg {...props} designId="004" h2="Home 2 Unmarked" step="E" />;
	if(key === "add-new-3") // let's add a 3rd item
		return <AddNewOrg {...props} designId="002" h2="Add Todo" step="F" />;
	if(key === "home-3") // we now see 3 items on the home screen. let's go into review mode next.
		return <HomeOrg {...props} designId="004" h2="Home 3 Unmarked" step="G" />;
	if(key === "review") // we review the first reviewable item
		return <ReviewOrg {...props} designId="005" h2="Review 1" step="H" />;
	if(key === "review-2") // we then review the next reviewable item. 
		return <ReviewOrg {...props} designId="005" h2="Review 2" step="I" />;
	if(key === "home-marked") // now we see 2 items marked on home screen, we can now enter focus mode.
		return <HomeOrg {...props} designId="006" h2="Home Marked" step="J" />;
	if(key === "focus") // in focus mode, we will mark the CMWTD item as 100% done.
		return <FocusOrg {...props} designId="007" h2="Focus" step="K" />;
	if(key === "home-with-done") // which returns us back to home w/ the done item marked as done
		return <HomeOrg {...props} designId="008" h2="Home With 1 Done" step="L" />;
	// if(key === "")
	// 	return ;
};