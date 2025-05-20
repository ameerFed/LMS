import AddExperienceComponent from "../../../components/AddExperienceComponent/AddExperienceComponent";

export default function InstructorAddExperience() {
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-5">
        <h1 className="ah-heading-02 fw-semibold mb-3">Add Experience</h1>
      </div>
      <AddExperienceComponent />
    </div>
  );
}
