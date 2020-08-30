<template>
    <div>
        <h2 class="my-2">Education Credentials</h2>
        <table class="table bg-white">
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th class="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="edu in educations" :key="edu._id">
                    <td>{{ edu.school }}</td>
                    <td>{{ edu.degree }}</td>
                    <td class="hide-sm">
                        {{ edu.from | moment("YYYY/MM/DD") }} -
                        {{
                            edu.to === null
                                ? "Now"
                                : edu.to | moment("YYYY/MM/DD")
                        }}
                    </td>
                    <td>
                        <button
                            class="btn btn-danger btn-round"
                            @click="onClick(edu._id)"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Education",
    methods: {
        ...mapActions(["deleteEducation", "getCurrentProfile"]),
        onClick(eduId) {
            this.deleteEducation({ eduId });
            this.getCurrentProfile();
            window.scrollTo(0, 0);
        },
    },
    props: ["educations"],
};
</script>

<style></style>
