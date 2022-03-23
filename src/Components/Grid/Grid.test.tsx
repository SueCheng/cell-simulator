import React from "react";
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import {Grid}from "./Grid";

describe("<Grid />",()=>{
    
    it("should render initial empty board with proper lightblue rows and columns",()=>{
        render(<Grid maxRow={30} maxColumn={20}/>);
        const cells = screen.getAllByRole("button",{name:/^cell/i});
        expect(cells).toHaveLength(600);
        cells.forEach(cell=>{
            expect(cell).toHaveStyle(`background: lightblue;`)});
    });
    
    it("should render next generation button and reset button",()=>{
        render(<Grid />);
        expect(screen.getByRole("button",{name:/next generation/i})).toBeVisible();
        expect(screen.getByRole("button",{name:/reset/i})).toBeVisible();
    });

    it("should toggle background color when cell is clicked",()=>{
        render(<Grid />);
        const cell = screen.getByRole("button",{name:/cell-2-3/i});
        user.click(cell);
        expect(cell).toHaveStyle(`background: darkblue;`);
        user.click(cell);
        expect(cell).toHaveStyle(`background: lightblue;`);
    });

    it("should reset all cells to initial state when reset button is clicked",()=>{
        render(<Grid />);
        const cell = screen.getByRole("button",{name:/cell-2-3/i});
        user.click(cell);
        expect(cell).toHaveStyle(`background: darkblue;`);
        const resetButton = screen.getByRole("button",{name:/reset/i});
        user.click(resetButton);
        const cells = screen.getAllByRole("button",{name:/^cell/i});
        cells.forEach(cell=>{
            expect(cell).toHaveStyle(`background: lightblue;`)});
    });

    it("should generate properly when 'next generation' button is clicked",()=>{
        render(<Grid />);
        const cell0203 = screen.getByRole("button",{name:/cell-2-3/i});
        user.click(cell0203);
        const cell0204 = screen.getByRole("button",{name:/cell-2-4/i});
        user.click(cell0204);
        const cell0304 = screen.getByRole("button",{name:/cell-3-4/i});
        user.click(cell0304);
        const cell0404 = screen.getByRole("button",{name:/cell-4-4/i});
        user.click(cell0404);
        const generationButton = screen.getByRole("button",{name:/next generation/i});
        user.click(generationButton);
        expect(cell0203).toHaveStyle(`background: darkblue;`);
        expect(cell0204).toHaveStyle(`background: darkblue;`);
        expect(cell0304).toHaveStyle(`background: darkblue;`);
        //die becaue of less neighbours
        expect(cell0404).toHaveStyle(`background: lightblue;`);
        //come to life because of getting exactly 3 neighbours
        expect(screen.getByRole("button",{name:/cell-3-5/i})).toHaveStyle(`background: darkblue;`);
    })

    it("should generate properly when 'next generation' button is clicked when a few border cells are live",()=>{
        render(<Grid />);
        const cell1012 = screen.getByRole("button",{name:/cell-10-12/i});
        user.click(cell1012);
        const cell1112 = screen.getByRole("button",{name:/cell-11-12/i});
        user.click(cell1112);
        const cell1212 = screen.getByRole("button",{name:/cell-12-12/i});
        user.click(cell1212);
        const generationButton = screen.getByRole("button",{name:/next generation/i});
        user.click(generationButton);
        //die because of less neighbours
        expect(cell1012).toHaveStyle(`background: lightblue;`);
        expect(cell1212).toHaveStyle(`background: lightblue;`);
        //stay alive
        expect(cell1112).toHaveStyle(`background: darkblue;`);
        //come to life because of getting exactly 3 neighbours
        expect(screen.getByRole("button",{name:/cell-11-0/i})).toHaveStyle(`background: darkblue;`);
        expect(screen.getByRole("button",{name:/cell-11-11/i})).toHaveStyle(`background: darkblue;`);
    })

    //TODO: add more edge cases for testing next generation with wrapped border neighour cells

})


